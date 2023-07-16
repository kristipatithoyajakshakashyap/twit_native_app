import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/LoginSignup/Login/Login";
import Signup_EnterEmail from "./src/screens/LoginSignup/Signup/Signup_EnterEmail";
import Signup_EnterVerificationCode from "./src/screens/LoginSignup/Signup/Signup_EnterVerificationCode";
import Signup_ChooseUsername from "./src/screens/LoginSignup/Signup/Signup_ChooseUsername";
import Signup_AccountCreated from "./src/screens/LoginSignup/Signup/Signup_AccountCreated";
import Signup_ChoosePassword from "./src/screens/LoginSignup/Signup/Signup_ChoosePassword";
import ForgotPassword_EnterEmail from "./src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmail";
import ForgotPassword_EnterVerificationCode from "./src/screens/LoginSignup/ForgotPassword/ForgotPassword_EnterVerificationCode";
import ForgotPassword_ChoosePassword from "./src/screens/LoginSignup/ForgotPassword/ForgotPassword_ChoosePassword";
import ForgotPassword_AccountRecovered from "./src/screens/LoginSignup/ForgotPassword/ForgotPassword_AccountRecovered";
import MainPage from "./src/screens/MainPage/MainPage";
import All_Chats from "./src/screens/ChatSection/All_Chats";
import SearchUserPage from "./src/screens/MainPage/SearchUserPage";
import NotificationPage from "./src/screens/MainPage/NotificationPage";
import My_UserProfile from "./src/screens/Profile/My_UserProfile";
import Other_UserProfile from "./src/screens/Profile/Other_UserProfile";
import Settings1 from "./src/screens/Settings/Settings1";
import ChangePassword from "./src/screens/Settings/ChangePassword";
import EditProfile from "./src/screens/Settings/EditProfile";
import ChangeUsername from "./src/screens/Settings/ChangeUsername";
import ChangeDescription from "./src/screens/Settings/ChangeDescription";
import UploadProfilePicture from "./src/screens/Settings/UploadProfilePicture";
import AddPost from "./src/screens/MainPage/AddPost";
import MessagePage from "./src/screens/ChatSection/MessagePage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
        <Stack.Screen
          name="Signup_EnterVerificationCode"
          component={Signup_EnterVerificationCode}
        />
        <Stack.Screen
          name="Signup_ChooseUsername"
          component={Signup_ChooseUsername}
        />
        <Stack.Screen
          name="Signup_ChoosePassword"
          component={Signup_ChoosePassword}
        />
        <Stack.Screen
          name="Signup_AccountCreated"
          component={Signup_AccountCreated}
        />
        <Stack.Screen
          name="ForgotPassword_EnterEmail"
          component={ForgotPassword_EnterEmail}
        />
        <Stack.Screen
          name="ForgotPassword_EnterVerificationCode"
          component={ForgotPassword_EnterVerificationCode}
        />
        <Stack.Screen
          name="ForgotPassword_ChoosePassword"
          component={ForgotPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgotPassword_AccountRecovered"
          component={ForgotPassword_AccountRecovered}
        />

        <Stack.Screen
          name="All_Chats"
          component={All_Chats}
          options={{
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="SearchUserPage"
          component={SearchUserPage}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="NotificationPage"
          component={NotificationPage}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="My_UserProfile"
          component={My_UserProfile}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="Settings1" component={Settings1} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
        <Stack.Screen
          name="UploadProfilePicture"
          component={UploadProfilePicture}
        />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen
          name="Other_UserProfile"
          component={Other_UserProfile}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="MessagePage" component={MessagePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

