// import { Amplify } from "aws-amplify";
// import { confirmSignUp, ConfirmSignUpInput, signUp } from "aws-amplify/auth";

// type SignUpParameters = {
//   email: string;
//   password: string;
// };

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: import.meta.env.VITE_USER_POOL_ID,
//       userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
//       identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
//       allowGuestAccess: true,
//       signUpVerificationMethod: "code",
//       loginWith: {
//         oauth: {
//           domain: import.meta.env.VITE_COGNITO_HOST,
//           scopes: [
//             "email",
//             "profile",
//             "openid",
//             "aws.cognito.signin.user.admin",
//           ],
//           redirectSignIn: ["http://localhost:3000/"],
//           redirectSignOut: ["http://localhost:3000/"],
//           responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
//         },
//       },
//     },
//   },
// });

// // async function signIn(username: string, password: string) {
// //   try {
// //     const user = await Auth.signIn(username, password);
// //     console.log("user signed in:", user);
// //   } catch (error) {
// //     console.error("error signing in:", error);
// //   }
// // }

// async function handleSignUp({ email, password }: SignUpParameters) {
//   try {
//     const { isSignUpComplete, userId, nextStep } = await signUp({
//       username: email,
//       password,
//       options: {
//         userAttributes: {},
//         autoSignIn: true,
//       },
//     });

//     console.log(userId);
//   } catch (error) {
//     console.log("Error signing up:", error);
//   }
// }

// async function handleSignUpConfirmation({
//   username,
//   confirmationCode,
// }: ConfirmSignUpInput) {
//   try {
//     const { isSignUpComplete, nextStep } = await confirmSignUp({
//       username,
//       confirmationCode,
//     });

//     return { isSignUpComplete, nextStep }
//   } catch (error) {
//     console.log("error confirming sign up", error);
//   }
// }
