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
import { logoUsd } from "ionicons/icons";

import { FormInput } from "../../components/Input";

import "../Page.css";

const Page: React.FC = () => {
  const name = "Wizard 2";

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
        <FormInput name="employer" label="Employer" />

        <FormInput
          name="salary"
          label="Salary"
          adornment={logoUsd}
          inputMode="decimal"
          type="number"
        />
        <IonButton routerLink="1">Back</IonButton>
        <IonButton routerLink="3">Next</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Page;
