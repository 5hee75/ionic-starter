import React, { useEffect, useState } from "react";
import {
  IonSelect,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  useIonModal,
  IonButton,
  IonSelectOption,
  IonTextarea,
  IonText,
  IonIcon,
  IonRow,
  IonCol
} from "@ionic/react";
import { logoUsd } from "ionicons/icons";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";

import { Input, TextArea } from "../components/Input";
import { Select, List } from "../components/Select";

import "./Page.css";

const Stuff: React.FC = () => {
  return <div>Hello there, Mr. Sheets</div>;
};

const Page: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const name = "Form";
  // const [show, setShow] = React.useState(false);

  const [show, hide] = useIonModal(Stuff, {
    initialBreakpoint: 0.01,
    breakpoints: [0.01, 0.5]
  });

  const [selected, setSelected] = useState(null);

  // useEffect(() => {
  //   show({
  //     backdropDismiss: false,
  //     breakpoints: [0.025, 0.5],
  //     initialBreakpoint: 0.025,
  //     showBackdrop: false
  //   });
  //   return () => hide();
  // }, [show, hide]);

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

        <Input label="Price" adornment={logoUsd} />
        <Select
          label="Select one"
          value={selected}
          options={[
            { label: "First", value: 1 },
            { label: "Second", value: 2 }
          ]}
          onSelect={(newSelected) => {
            console.log("Selected value(s)", newSelected);
            setSelected(newSelected);
          }}
        />
        <IonRow style={{ marginBottom: 12 }}>
          <IonCol className="ion-no-padding">
            <Input label="Split A" />
          </IonCol>
          <IonCol className="ion-no-padding">
            <Input label="Split B" />
          </IonCol>
        </IonRow>

        <TextArea label="Comment" maxLength={50} />

        {/* <IonItem className="input" lines="inset">
          <IonLabel>Inline</IonLabel>
          <IonInput />
        </IonItem>

        <IonItem className="input" lines="inset">
          <IonLabel position="stacked">Stacked</IonLabel>
          <IonInput />
        </IonItem>

        <IonItem className="input" lines="inset">
          <IonLabel position="floating">Floating</IonLabel>
          <IonInput />
        </IonItem>

        <IonItem className="input" lines="inset">
          <IonLabel position="floating">Adornement</IonLabel>
          <IonInput>
            <IonIcon className="show-focused" icon={logoUsd} />
          </IonInput>
        </IonItem>

        <IonItem className="input" fill="outline">
          <IonLabel position="floating">Outlined</IonLabel>
          <IonInput />
        </IonItem> */}

        {/*<IonButton
          onClick={() =>
            show({ initialBreakpoint: 0.01, breakpoints: [0.01, 0.5] })
          }
        >
          Show
        </IonButton> */}
      </IonContent>
      {/* <IonModal
          isOpen={true}
          backdropDismiss={false}
          initialBreakpoint={0.025}
          breakpoints={[0.025, 0.5]}
        >
          <Stuff />
        </IonModal> */}
    </IonPage>
  );
};

export default Page;
