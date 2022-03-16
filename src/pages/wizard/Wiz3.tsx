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

import { FormTextArea } from "../../components/Input";
import { FormSelect } from "../../components/Select";

import "../Page.css";

const Page: React.FC = () => {
  const name = "Wizard 3";

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
        <FormSelect
          name="colors"
          label="Favorite colors"
          multiple
          options={[
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
            { label: "Yellow", value: "yellow" },
            { label: "Purple", value: "purple" }
          ]}
        />

        <FormTextArea name="comment" label="Final comments" maxLength={100} />
        <IonButton routerLink="2">Back</IonButton>
        <IonButton type="submit">Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Page;
