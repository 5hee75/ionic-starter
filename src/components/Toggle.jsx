import React from "react";
import styled from "styled-components";
import { IonSegmentButton, IonSegment, IonLabel } from "@ionic/react";

const Segment = styled(IonSegment).attrs({
  mode: "ios",
  scrollable: true
})`
  width: 145px;
  pointer-events: auto;
  --background: ${({ value }) => {
    if (value === "pass") return "rgba(var(--ion-color-success-rgb), 0.2)";
    if (value === "fail") return "rgba(var(--ion-color-danger-rgb), 0.2)";
    return "";
  }};
`;

const SegmentButton = styled(IonSegmentButton)`
  --indicator-color: ${(props) =>
    props.value === "pass"
      ? "var(--ion-color-success)"
      : "var(--ion-color-danger)"};
  /* --background-checked: ${(props) =>
    props.value === "pass"
      ? "var(--ion-color-success)"
      : "var(--ion-color-danger)"}; */
  --color-checked: white;
`;

export default function Toggle(props) {
  return (
    <Segment {...props}>
      <SegmentButton value="pass">
        <IonLabel>Pass</IonLabel>
      </SegmentButton>
      <SegmentButton value="fail">
        <IonLabel>Fail</IonLabel>
      </SegmentButton>
    </Segment>
  );
}
