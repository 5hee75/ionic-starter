import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { isFunction } from "util";

import Toggle from "../components/Toggle";
import Accordion from "../components/Accordion";

const Repeat = (props) => {
  const { children, n = 1 } = props;

  const childList = [];
  for (let i = 1; i <= n; i++) {
    childList.push(isFunction(children) ? children(i) : children);
  }
  return <>{childList}</>;
};

const ListHeader = styled(IonListHeader)`
  --background: #efefef;
  --border-color: black;
  --border-style: solid;
  --border-width: 0px;
  --color: black;
  --inner-border-width: 0px;
  font-size: 16px;
  font-weight: bold;
`;

const ListPage = () => {
  const name = "List";

  const accordionRef = React.useRef({});
  const [items, setItems] = React.useState([]);

  const onAccordionToggle = ({ name, status }) => {
    if (status === "fail") {
      const set = new Set(accordionRef.current.value);
      set.add(name);
      accordionRef.current.value = [...set];
    } else {
      accordionRef.current.value = accordionRef.current.value.filter(
        (v) => v !== name
      );
    }
  };

  const onToggle = (e) => {
    if (e.detail.value === "fail") {
      accordionRef.current.value = ["item-1"];
    } else {
      accordionRef.current.value = [];
    }
  };

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

      <IonContent fullscreen className="page">
        <Toggle />
        <IonList>
          <Repeat n={1}>
            {(s) => (
              <>
                <ListHeader>Section {s}</ListHeader>
                <Repeat n={2}>
                  {(i) => (
                    <IonItem>
                      Item {s}.{i}
                      <Toggle slot="end" onIonChange={onToggle} />
                    </IonItem>
                  )}
                </Repeat>
                <ListHeader>Section {s} Accordion</ListHeader>
                <Repeat n={1}>
                  {(i) => (
                    <IonAccordionGroup
                      value={items}
                      multiple
                      readonly
                      ref={accordionRef}
                    >
                      {/* <IonAccordion
                        readonly
                        value={`item-${i}`}
                        toggleIconSlot="none"
                      >
                        <IonItem slot="header">
                          Item {s}.{i}
                          <Toggle slot="end" onIonChange={onToggle} />
                        </IonItem>
                        <IonItem slot="content">
                          <IonLabel>Howdy</IonLabel>
                        </IonItem>
                      </IonAccordion> */}
                      <Repeat n={10}>
                        {(idx) => (
                          <Accordion
                            name={`damage-${idx}`}
                            label={`Damage ${idx}`}
                            onChange={onAccordionToggle}
                          />
                        )}
                      </Repeat>
                    </IonAccordionGroup>
                  )}
                </Repeat>
              </>
            )}
          </Repeat>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
