import React, { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { logoUsd } from "ionicons/icons";

import { Input, TextArea, SplitRow } from "../components/Input";
import { Select } from "../components/Select";

import "./Page.css";

const Page: React.FC = () => {
  const name = "Form";

  const [selected, setSelected] = useState(null);

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
        <Input label="Name" />

        <Input
          label="Price"
          adornment={logoUsd}
          inputMode="decimal"
          type="number"
        />

        <Select
          label="Select one"
          value={selected}
          options={[
            { label: "First", value: 1 },
            { label: "Second", value: 2 }
          ]}
          onSelect={(newSelected) => {
            setSelected(newSelected);
          }}
        />

        <SplitRow>
          <Input label="Split A" />
          <Input label="Split B" />
        </SplitRow>

        <TextArea label="Comment" maxLength={50} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
