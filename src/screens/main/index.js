import { useFocusEffect } from '@react-navigation/core';
import React , {useState , useEffect, useCallback} from 'react'
import { NativeModules, Text, View } from 'react-native';
import { AppBar} from './../../components/template'
import * as Login from './login_handler'; 
import Spinner from 'react-native-loading-spinner-overlay';
import { Waiting} from './../../components/organism'
import {TabNavigation} from './../../navigation'
import {SplitView} from './../../components/template'
import {Message} from './../../screens'
const { AuthModule } = NativeModules;

const Main = (props) => {
  const [userId , setUserId] = useState(0)
  const [isWaiting , setIsWaiting] = useState(false)
  useEffect(() => { Login.onUserIdChange(userId , props.propUpper.navigation , setIsWaiting) }, [userId])
  useFocusEffect(
    useCallback(
      () => Login.loginCheck(props.propUpper.navigation , props.propUpper.route, AuthModule , setUserId)
      , [],
    )
  )
    return (
      <>
        <Spinner
          visible={ isWaiting }
          size={'normal'}
          animation={"slide"}
          cancelable={true}
          customIndicator={<Waiting/>}
        />
        <AppBar {...props.propUpper } title='سامانه بی سیم' isShowSearch={false}/>
        <SplitView>
          <TabNavigation {...props.propUpper}/>
          <Message/>
        </SplitView>
    </>
    )
}
export default Main