import React from "react";
import styled from "styled-components";
import {
  IonAccordion,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonThumbnail,
  IonIcon
} from "@ionic/react";
import { camera } from "ionicons/icons";

import Toggle from "./Toggle";
import { TextArea } from "./Input";
import { Select, FormSelect } from "./Select";
import { Field, useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

/* --background: rgba(${props => (props.status === 'fail' ? var(--ion-color-danger-rgb) : var(--ion-color-success-rgb))}, 0.05); */
const getColor = ({ status } = {}) => {
  if (!status) return "";
  return status === "fail"
    ? "var(--ion-color-danger-rgb)"
    : "var(--ion-color-success-rgb)";
};

const Item = styled(IonItem)`
  --background: rgba(${getColor}, 0.05);
`;

const StyledAccordion = styled(IonAccordion)`
  & > ion-item[slot="header"],
  &:last-of-type > ion-item[slot="header"] {
    --background-hover: white;
    --ripple-color: white;
    --background-focused: white;
    /* --border: 1; */
    /* --border-width: 1px 0 0; */
    --border-color: var(--ion-color-light);
  }

  &:first-of-type > ion-item[slot="header"] {
    --border-width: 0;
  }
  & > [slot="content"] {
    background-image: linear-gradient(
      to bottom,
      rgba(${getColor}, 0.05),
      rgba(${getColor}, 0),
      rgba(${getColor}, 0)
    );
    & > ion-item {
      --background: transparent;
    }

    & > ion-item + ion-item {
      margin-top: 6px;
    }
  }
`;

const Thumb = styled(IonThumbnail)`
  margin-right: 4px;
  --border-radius: 4px;

  & > ion-button {
    height: 100%;
    margin: auto;
  }
`;

const Button = styled(IonButton).attrs({
  expand: "block",
  fill: "outline"
})`
  --border-radius: 8px;
  --background: var(--ion-color-light);
  --border-color: var(--ion-color-medium-tint);
  --color: var(--ion-color-dark-tint);
`;

const FullButton = styled(Button)`
  width: 75%;
  margin: auto;
  margin-top: 24px;
`;

export default function Accordion({ name, label, status, onExpandToggle }) {
  const [value, setValue] = React.useState(status);
  const [selected, setSelected] = React.useState([]);

  const {
    mutators: { push, pop }
  } = useForm();

  // React.useEffect(() => {
  //   setValue(status);
  // }, [status]);

  const onToggle = (onChange) => (e) => {
    // console.log("Toggle", name, e.detail.value);
    e.stopPropagation();
    // setValue(e.detail.value);
    onExpandToggle({ name, status: e.detail.value });
    onChange(e.detail.value);
  };

  return (
    <StyledAccordion
      status={value}
      readonly={false}
      value={name}
      toggleIconSlot="none"
    >
      <Field name={`${name}.status`}>
        {(props) => (
          <Item status={props.input.value} lines="full" slot="header">
            {label}

            <Toggle
              slot="end"
              value={props.input.value}
              onIonChange={onToggle(props.input.onChange)}
            />
          </Item>
        )}
      </Field>
      <div slot="content" style={{ padding: "8px 12px 16px 0" }}>
        {/* <TextArea slot="content" label="Comments" maxLength={50} /> */}
        <FormSelect
          name={`${name}.description`}
          multiple
          label="Description"
          options={[
            { label: "Bent", value: "Bent" },
            { label: "Scratched", value: "Scratched" },
            { label: "Cracked", value: "Cracked" },
            { label: "Chipped", value: "Chipped" }
          ]}
        />
        {/* <div style={{ width: "50%", margin: "auto" }}>
          <IonButton style={{ height: 48 }} fill="solid" expand="block" size="large">
            <IonIcon slot="icon-only" src={camera} />
          </IonButton>
        </div> */}
        <FieldArray name={`${name}.images`}>
          {({ fields }) =>
            fields?.length > 0 ? (
              <IonItem lines="none">
                {fields.map((_name, index) => (
                  <Thumb key={_name}>
                    <Field name={`${_name}.src`}>
                      {(props) => <IonImg src={props.input.value} />}
                    </Field>
                  </Thumb>
                ))}
                {/* <Thumb>
                  <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
                </Thumb>
                <Thumb>
                  <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
                </Thumb>
                <Thumb>
                  <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
                </Thumb> */}
                <Thumb slot="end">
                  <Button
                    onClick={() =>
                      push(`${name}.images`, {
                        src:
                          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1"
                      })
                    }
                  >
                    <IonIcon slot="icon-only" src={camera} />
                  </Button>
                </Thumb>
              </IonItem>
            ) : (
              <FullButton
                onClick={() =>
                  push(`${name}.images`, {
                    src:
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1"
                  })
                }
              >
                <IonIcon slot="icon-only" src={camera} />
              </FullButton>
            )
          }
        </FieldArray>
        {/* {selected?.length > 0 ? (
          <IonItem lines="none">
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb slot="end">
              <Button>
                <IonIcon slot="icon-only" src={camera} />
              </Button>
            </Thumb>
          </IonItem>
        ) : (
          <FullButton>
            <IonIcon slot="icon-only" src={camera} />
          </FullButton>
        )} */}
      </div>
    </StyledAccordion>
  );
}

export const FormAccordion = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ input }) => (
        <Accordion
          name={name}
          {...props}
          value={input.value}
          onChange={input.onChange}
        />
      )}
    </Field>
  );
};
