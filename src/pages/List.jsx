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

import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

import Toggle from "../components/Toggle";
import { FormAccordion } from "../components/Accordion";

const Repeat = (props) => {
  const { children, n = 1 } = props;

  const childList = [];
  for (let i = 1; i <= n; i++) {
    childList.push(isFunction(children) ? children(i) : children);
  }
  return <>{childList}</>;
};

const ListHeader = styled(IonListHeader)`
  /* --background: #efefef; */
  --border-color: var(--ion-color-light-shade);
  --border-style: solid;
  --border-width: 0 0 2px;
  --color: black;
  --inner-border-width: 0px;
  font-size: 16px;
  font-weight: bold;
`;

const ListPage = () => {
  const name = "List";

  const accordionRef = React.useRef({});
  // const [items, setItems] = React.useState([]);

  const onAccordionToggle = ({ name, status }) => {
    // const set = new Set(accordionRef.current.value);
    // console.log("Toggle accordion", name);
    // if (status === "fail") {
    //   set.add(name);
    //   accordionRef.current.value = [...set];
    //   console.log("Added", [...set]);
    //   // setItems([...set]);
    // } else {
    //   set.delete(name);
    //   console.log("Removed", [...set]);
    //   accordionRef.current.value = [...set];
    //   // setItems([...set]);
    // }
  };

  const onToggle = (e) => {
    console.log("Toggle group", e);
    // const itemSet = new Set([...items, ...e.detail.value]);
    // console.log("New Items", [...itemSet]);
    // setItems([...itemSet]);
  };

  const onSubmit = (values) => {
    console.log(values);
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
        <Form
          initialValues={{}}
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators
          }}
        >
          {({ handleSubmit, submitting, values }) => {
            const failedDamage = Object.entries(values).reduce((res, d) => {
              if (d[1].status === "fail") res.push(d[0]);
              return res;
            }, []);
            console.log("Failed damage", failedDamage, values);
            return (
              <IonList>
                <form onSubmit={handleSubmit}>
                  <button type="submit">Submit</button>
                  <IonAccordionGroup
                    multiple
                    readonly
                    onIonChange={onToggle}
                    value={failedDamage}
                    ref={accordionRef}
                  >
                    <Repeat n={2}>
                      {(s) => (
                        <>
                          <ListHeader>Section {s} Accordion</ListHeader>
                          <Repeat n={5}>
                            {(idx) => (
                              <FormAccordion
                                name={`damage-${s}-${idx}`}
                                label={`Damage ${idx}`}
                                onExpandToggle={onAccordionToggle}
                              />
                            )}
                          </Repeat>
                        </>
                      )}
                    </Repeat>
                  </IonAccordionGroup>
                </form>
              </IonList>
            );
          }}
        </Form>
      </IonContent>
    </IonPage>
  );
};

export default ListPage;
