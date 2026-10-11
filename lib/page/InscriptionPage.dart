import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'BasePage.dart';

class InscriptionPage extends StatefulWidget {
  const InscriptionPage({super.key});

  @override
  _InscriptionPageState createState() => _InscriptionPageState();
}

class _InscriptionPageState extends State<InscriptionPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _showDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    final username = _usernameController.text.trim();
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();
    final confirmPassword = _confirmPasswordController.text.trim();

    if (password != confirmPassword) {
      _showDialog('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Firebase Auth: Create User
      UserCredential userCredential = await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: email, password: password);

      final user = userCredential.user;

      if (user != null) {
        // Write user data to Firestore
        await FirebaseFirestore.instance.collection('users').doc(user.uid).set({
          'username': username,
          'email': email,
          'createdAt': FieldValue.serverTimestamp(),
        });

        // Send Email Verification
        await user.sendEmailVerification();

        // Navigate to BasePage after registration and email verification
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const BasePage()),
        );
      }
    } on FirebaseAuthException catch (e) {
      // Error Handling
      String errorMsg;
      switch (e.code) {
        case 'email-already-in-use':
          errorMsg = 'The email is already in use. Please try a different one.';
          break;
        case 'weak-password':
          errorMsg = 'The password is too weak. Please use a stronger password.';
          break;
        default:
          errorMsg = e.message ?? 'An unexpected error occurred.';
      }
      _showDialog('Error', errorMsg);
    } catch (e) {
      _showDialog('Error', 'An unexpected error occurred. Please try again.');
    }
  }

  Widget _buildTextField({
    required String label,
    required TextEditingController controller,
    required Icon icon,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      validator: validator,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: icon,
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(30),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[50],
      body: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Avatar
                CircleAvatar(
                  radius: 50,
                  backgroundColor: Colors.white,
                  child: const Icon(
                    Icons.person,
                    size: 50,
                    color: Colors.teal,
                  ),
                ),
                const SizedBox(height: 20),
                const Text(
                  'Register',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.teal,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Enter Your Personal Information',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey,
                  ),
                ),
                const SizedBox(height: 30),

                // Form
                Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _buildTextField(
                        label: 'Username',
                        controller: _usernameController,
                        icon: const Icon(Icons.person, color: Colors.grey),
                        validator: (value) =>
                        value == null || value.isEmpty
                            ? 'Enter your username'
                            : null,
                      ),
                      const SizedBox(height: 10),
                      _buildTextField(
                        label: 'Email',
                        controller: _emailController,
                        icon: const Icon(Icons.email, color: Colors.grey),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Enter your email address';
                          }
                          final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
                          return emailRegex.hasMatch(value)
                              ? null
                              : 'Enter a valid email address';
                        },
                      ),
                      const SizedBox(height: 10),
                      _buildTextField(
                        label: 'Password',
                        controller: _passwordController,
                        icon: const Icon(Icons.lock, color: Colors.grey),
                        obscureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Enter your password';
                          }
                          return value.length >= 6
                              ? null
                              : 'Password must be at least 6 characters long';
                        },
                      ),
                      const SizedBox(height: 10),
                      _buildTextField(
                        label: 'Confirm Password',
                        controller: _confirmPasswordController,
                        icon: const Icon(Icons.lock, color: Colors.grey),
                        obscureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Confirm your password';
                          }
                          return value == _passwordController.text
                              ? null
                              : 'Passwords do not match';
                        },
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _submitForm,
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          backgroundColor: Colors.teal[100],
                        ),
                        child: const Text(
                          'Register',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
