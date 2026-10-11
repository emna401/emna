import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class BMIChart extends StatelessWidget {
  final double weight;
  final double minIdealWeight;
  final double maxIdealWeight;

  const BMIChart({
    super.key,
    required this.weight,
    required this.minIdealWeight,
    required this.maxIdealWeight,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      child: LineChart(
        LineChartData(
          lineBarsData: [
            LineChartBarData(
              spots: [
                FlSpot(0, minIdealWeight),
                FlSpot(0.5, maxIdealWeight),
                FlSpot(1, minIdealWeight),
              ],
              isCurved: true,
              color: Colors.green,
              barWidth: 4,
              isStrokeCapRound: true,
              belowBarData: BarAreaData(
                show: true,
                color: Colors.lightBlue.withOpacity(0.2),
              ),
            ),

            LineChartBarData(
              spots: [
                FlSpot(0, weight),
                FlSpot(1, weight),
              ],
              isCurved: false,
              color: Colors.blue,
              barWidth: 4,
              isStrokeCapRound: true,
              belowBarData: BarAreaData(show: false),
            ),
          ],
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 38,
                getTitlesWidget: (value, meta) {
                  switch (value.toInt()) {
                    case 0:
                      return const Text('Min Ideal');
                    case 1:
                      return const Text('Max Ideal');
                    default:
                      return const Text('');
                  }
                },
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(showTitles: true),
            ),
          ),
          gridData: FlGridData(show: true, drawHorizontalLine: true),
          borderData: FlBorderData(show: true, border: Border.all(color: Colors.black)),
          lineTouchData: LineTouchData(enabled: false),
        ),
      ),
    );
  }
}
class TestPage extends StatefulWidget {
  const TestPage({super.key});

  @override
  _TestPageState createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _heightController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _ageController = TextEditingController();
  String _result = "";

  double weight = 0.0;
  double minIdealWeight = 0.0;
  double maxIdealWeight = 0.0;

  Future<void> _saveToFirestore(String userId) async {
    try {
      final bmi = _calculateBMI(weight, minIdealWeight);
      final categoryDetails = _getCategory(bmi);


      await FirebaseFirestore.instance.collection('users').doc(userId).set({
        'height': _heightController.text,
        'weight': weight,
        'minIdealWeight': minIdealWeight,
        'maxIdealWeight': maxIdealWeight,
        'bmi': bmi,
        'category': categoryDetails['category'],
        'createdAt': FieldValue.serverTimestamp(),
      });

      print("User  BMI data saved successfully.");
    } catch (e) {
      print("Error saving data to Firestore: $e");
    }
  }


  double _calculateBMI(double weight, double height) {
    return weight / (height * height);
  }

  Map<String, String> _getCategory(double bmi) {
    String category;
    if (bmi < 18.5) {
      category = 'Underweight. Consider consuming energy-dense meals to gain weight healthily.';
    } else if (bmi < 24.9) {
      category = 'Normal weight. Maintain a balanced diet and stay active!';
    } else if (bmi < 29.9) {
      category = 'Overweight. Incorporate more fruits, vegetables, and regular exercise into your routine.';
    } else {
      category = 'Obesity. Consult a healthcare provider for a tailored plan to improve your health.';
    }
    return {'category': category};
  }


  void _calculateCategory() async {
    if (_formKey.currentState!.validate()) {
      final double heightCm = double.tryParse(_heightController.text) ?? 0.0;
      final double weightInput = double.tryParse(_weightController.text) ?? 0.0;


      final double heightMeters = heightCm / 100;

      weight = weightInput;
      minIdealWeight = _calculateMinIdealWeight(heightMeters);
      maxIdealWeight = _calculateMaxIdealWeight(heightMeters);

      setState(() {});

      final categoryDetails = _getCategory(_calculateBMI(weight, heightMeters));

      setState(() {
        _result = """
Your BMI: ${_calculateBMI(weight, heightMeters).toStringAsFixed(1)}
Category: ${categoryDetails['category']}
Ideal weight range: ${minIdealWeight.toStringAsFixed(1)} kg - ${maxIdealWeight.toStringAsFixed(1)} kg
""";
      });


      User? firebaseUser  = FirebaseAuth.instance.currentUser ;
      if (firebaseUser  != null) {
        _saveToFirestore(firebaseUser .uid);
      } else {
        print("No user is logged in!");
      }
    }
  }

  double _calculateMinIdealWeight(double height) {
    return 18.5 * (height * height);
  }

  double _calculateMaxIdealWeight(double height) {
    return 24.9 * (height * height);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Health Check'),
        backgroundColor: Colors.teal[100],
      ),
      backgroundColor: Colors.teal[50],
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              const Text(
                'Health Check',
                style: TextStyle(
                  fontSize:  24,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              const SizedBox(height: 20),
              _buildTextField(
                controller: _ageController,
                label: 'Age',
                icon: Icons.person,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your age';
                  }
                  final int? age = int.tryParse(value);
                  if (age == null || age < 0 || age > 120) {
                    return 'Enter a valid age between 0 and 120';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              _buildTextField(
                controller: _heightController,
                label: 'Height (cm)',
                icon: Icons.height,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your height';
                  }
                  final double? height = double.tryParse(value);
                  if (height == null || height < 50 || height > 250) {
                    return 'Enter a valid height in cm';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              _buildTextField(
                controller: _weightController,
                label: 'Weight (kg)',
                icon: Icons.fitness_center,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your weight';
                  }
                  final double? weight = double.tryParse(value);
                  if (weight == null || weight < 10 || weight > 500) {
                    return 'Enter a valid weight';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _calculateCategory,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 18.0, horizontal: 36.0),
                  textStyle: const TextStyle(fontSize: 18),
                  backgroundColor: Colors.teal[100],
                ),
                child: const Text('Calculate BMI and Category'),
              ),
              const SizedBox(height: 20),

              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _result,
                    style: const TextStyle(fontSize: 18),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              BMIChart(
                weight: weight,
                minIdealWeight: minIdealWeight,
                maxIdealWeight: maxIdealWeight,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    required String? Function(String?) validator,
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: const OutlineInputBorder(),
      ),
      keyboardType: TextInputType.number,
      validator: validator,
    );
  }
}