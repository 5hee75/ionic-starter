import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import { Field } from "react-final-form";

import { FormInput } from "../../components/Input";
import { FormSelect } from "../../components/Select";

import "../Page.css";

const Page: React.FC = () => {
  const name = "Wizard 1";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page">
        <FormInput name="name" label="Name" />
        <FormInput name="age" label="Age" type="number" />

        <FormSelect
          name="gender"
          label="Gender"
          options={[
            { label: "Male", value: "M" },
            { label: "Female", value: "F" }
          ]}
        />
        <IonButton routerLink="2">Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Page;
