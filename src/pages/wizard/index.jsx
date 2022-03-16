import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Form } from "react-final-form";
import { Redirect, Route } from "react-router";

import Wiz1 from "./Wiz1";
import Wiz2 from "./Wiz2";
import Wiz3 from "./Wiz3";

const initialValues = {
  name: "",
  age: "",
  gender: "",
  employer: "",
  salary: "",
  colors: [],
  comment: ""
};
export default function Wizard() {
  console.log("render the wizard");
  const onSubmit = (values) => {
    console.log("Submit form!", values);
  };

  return (
    <IonPage>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, submitting, values }) => (
          <IonRouterOutlet>
            <form id="wizard-form" onSubmit={handleSubmit}>
              <Route exact path="/wizard/1">
                <Wiz1 />
              </Route>
              <Route exact path="/wizard/2">
                <Wiz2 />
              </Route>
              <Route exact path="/wizard/3">
                <Wiz3 />
              </Route>
              <Redirect from="/wizard" to="/wizard/1" />
            </form>
          </IonRouterOutlet>
        )}
      </Form>
    </IonPage>
  );
}
