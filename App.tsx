import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const passwordId = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be at least 4 characters')
    .max(16, 'Should be at most 16 characters')
    .required('Please provide the password length'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordlength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordlength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordId}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex.6"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <View>
                    <BouncyCheckbox
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#28a745"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <View>
                    <BouncyCheckbox
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#FFC107"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <View>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#C70039"
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include symbols</Text>
                  <View>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#3498DB"
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState ();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated?(
          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text style={styles.generatedPassword}>{password}</Text>
            </View>
        ): null }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    textAlign : "center" ,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight : "bold"
  },
  inputWrapper: {
    gap: 20,
    marginBottom: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    // marginTop : 5 ,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  primaryBtn: {
    width: 120,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#F5F5DC',
    elevation: 1,
  },
  primaryBtnTxt: {
    fontSize : 18 ,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 'auto',
  },
  secondaryBtn: {
    width: 120,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#D9EAF7',
    elevation: 1,
  },
  secondaryBtnTxt: {
    fontSize : 18 ,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 'auto',
    fontWeight: '700',
  },
  card: {
    paddingHorizontal : 14 ,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 14,
    elevation : 5 ,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
