import React from "react";

import Link from "next/link";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Authorization from "./Authorization";

import cls from "./registration.module.scss";
import SignUp from "./SingUp";

export default function Auth() {
  return (
    <>
      <div className="tabsAuth">
        <Tabs>
          <TabList>
            <Tab>Авторизация</Tab>
            <Tab>
              <Link href="/register">
                <a>Регистрация</a>
              </Link>
            </Tab>
          </TabList>

          <TabPanel>
            <Authorization />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
