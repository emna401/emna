import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';
import 'page/splash_screen.dart';
import 'page/InscriptionPage.dart';
import 'page/BasePage.dart';
import 'page/test.dart';
import 'page/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    FirebaseAuth.instance.authStateChanges().listen((User? user) {
      if (user == null) {
        print('User is currently signed out!');
      } else {
        print('User is signed in!');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Healthy',
      home: SplashScreen(),
      debugShowCheckedModeBanner: false,
      routes: {
        '/home_screen':(context)=> LoginPage(),
        '/InscriptionPage': (context) => InscriptionPage(),
        '/base': (context) => BasePage(),
        '/test': (context) => TestPage(),
      },
    );
  }
}
