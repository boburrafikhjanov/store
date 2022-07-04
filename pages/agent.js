import React from "react";
import Link from "next/link";
import {isIOS, isAndroid, isWinPhone, isMacOs, isWindows} from 'react-device-detect';


export default class Agent extends React.Component {

   render() {
      if (isIOS) {
         window.location.href = "https://apps.apple.com/us/app/brandstore/id1495161090?l=ru&ls=1";
      } else if (isAndroid) {
         window.location.href = "https://play.google.com/store/apps/details?id=brandstore.uz";
      } else if (isWinPhone) {
         window.location.href = "https://apps.apple.com/us/app/brandstore/id1495161090?l=ru&ls=1";
      } else if (isMacOs) {
         window.location.href = "https://apps.apple.com/us/app/brandstore/id1495161090?l=ru&ls=1";
      } else if (isWindows) {
         window.location.href = "https://play.google.com/store/apps/details?id=brandstore.uz";
      }
      return (<p>Redirect</p>)
   }
}
