import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { COMETCHAT_CONSTANTS } from "../../const";
import React, { Component } from "react";
import AuthService from "../../services/auth.service";
export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
      console.log(user.username);
    }
  }

  render() {
    const user = AuthService.getCurrentUser();
    const appID = COMETCHAT_CONSTANTS.APP_ID;
    const region = COMETCHAT_CONSTANTS.REGION;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
        const authKey = COMETCHAT_CONSTANTS.AUTH_KEY;
        const uid = user.username;

        CometChat.login(uid, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );

    return (
      <div className="page-content">
        <div style={{ height: "800px" }}>
          <CometChatUI />
        </div>
      </div>
    );
  }
}

export default Chat;
