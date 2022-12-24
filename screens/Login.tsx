import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>();

  const handleLogin = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, pass)
        .then(userCredential => {
          const user = userCredential.user;

          if (user) {
            // console.log(user);
            setIsLogin(true);
          }
        });
    } catch (error) {
      console.log('can not login: ', error);
    }
  };

  const handleRegister = async () => {
    // check value
    if (email && pass && rePass) {
      if (rePass !== pass) {
        console.log('password not match');
      } else {
        if (pass.length < 6) {
          console.log('password must contain at least 6 characters');
        } else {
          await auth()
            .createUserWithEmailAndPassword(email, pass)
            .then(userCredential => {
              const user = userCredential.user;

              if (user) {
                setUserInfo(user);
                setIsRegister(false);
              }
            })
            .catch(error => {
              console.log('can not register: ', error);
            });
        }
      }
    }
  };
  return (
    <ImageBackground
      source={require('../assets/images/bg-3.png')}
      resizeMode="cover"
      style={styles.container}
    >
      {isLogin && userInfo ? (
        <>
          <Text>{userInfo.email}</Text>

          <TouchableOpacity
            onPress={() =>
              auth()
                .signOut()
                .then(() => {
                  setIsLogin(false);
                })
            }
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              color: '#212121',
              marginVertical: 20,
            }}
          >
            {isRegister ? 'Sign in' : 'Login'}
          </Text>

          <View style={styles.loginFormContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={val => setEmail(val)}
                maxLength={100}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="off"
                maxLength={100}
                value={pass}
                onChangeText={val => setPass(val)}
                secureTextEntry
              />
            </View>

            {isRegister && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm</Text>
                <TextInput
                  style={styles.input}
                  placeholder="confirm password"
                  autoCapitalize="none"
                  autoComplete="off"
                  maxLength={100}
                  value={rePass}
                  onChangeText={val => setRePass(val)}
                  secureTextEntry
                />
              </View>
            )}
          </View>

          <View style={{height: 20}} />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={isRegister ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isRegister ? 'Sign in' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsRegister(!isRegister)}
            style={styles.buttonRegister}
          >
            <Text>{isRegister ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  loginFormContainer: {
    width: Dimensions.get('window').width - 40,
  },

  inputContainer: {
    marginTop: 8,
    marginBottom: 16,
  },

  inputLabel: {
    fontWeight: '500',
    color: '#212121',
    fontSize: 16,
  },

  input: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 8,
    padding: 10,
    borderRadius: 100,
    minHeight: 40,
  },

  buttonLogin: {
    height: 40,
    backgroundColor: 'coral',
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fafafa',
  },

  buttonRegister: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
