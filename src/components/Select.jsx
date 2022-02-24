import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  useIonActionSheet,
  useIonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonText,
  IonInput
} from "@ionic/react";
import {
  chevronDown,
  square,
  removeCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from "ionicons/icons";

const ListHeader = styled(IonListHeader)`
  font-size: 18px;
  font-weight: bold;
`;

const OptionLabel = styled(IonLabel)`
  font-weight: ${(props) => (props.selected ? "bold" : "regular")};
`;

const SelectOption = ({
  label,
  value,
  icon,
  isSelected,
  onSelect,
  showCheckbox
}) => (
  <IonItem detail={false} button onClick={onSelect}>
    {icon && <IonIcon slot="start" icon={icon} />}
    <OptionLabel selected={isSelected}>{label || value}</OptionLabel>
    {showCheckbox && <IonCheckbox checked={isSelected} slot="end" />}
  </IonItem>
);

export function SelectOptionList({
  handleDismiss,
  handleSelect,
  value = null,
  options = [],
  multiple
}) {
  const [selected, setSelected] = useState(value || (multiple ? [] : null));

  useEffect(() => {
    setSelected(value || (multiple ? [] : null));
  }, [setSelected, value, multiple]);

  const onOptionClick = (opt) => {
    if (multiple) {
      const selectedSet = new Set(selected);
      if (selectedSet.has(opt.value)) {
        selectedSet.delete(opt.value);
      } else {
        selectedSet.add(opt.value);
      }
      setSelected([...selectedSet]);
    } else {
      handleSelect(opt.value);
    }
  };

  const checkIsSelected = (optionValue) => {
    if (multiple) {
      const isChecked = Boolean(selected.find((v) => v === optionValue));
      return isChecked;
    }
    return optionValue === value;
  };

  const confirmSelection = () => {
    handleSelect(selected);
  };

  const clearSelected = () => {
    if (multiple) {
      setSelected([]);
    } else {
      handleSelect();
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar style={{ padding: 0 }} mode="md">
          <ListHeader slot="primary">Select One!</ListHeader>
          <IonButtons slot="end">
            {/* <IonButton color="danger" onClick={clearSelected}>
              <IonIcon slot="icon-only" icon={removeCircleOutline} />
            </IonButton> */}
            <IonButton
              color={multiple ? "primary" : null}
              onClick={multiple ? confirmSelection : handleDismiss}
            >
              {multiple ? "Done" : "Cancel"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {options.map((opt) => (
            <SelectOption
              key={opt.label || opt.value}
              {...opt}
              onSelect={() => onOptionClick(opt)}
              showCheckbox={multiple}
              isSelected={checkIsSelected(opt.value)}
            />
          ))}
        </IonList>
      </IonContent>
    </>
  );
}

const SelectItem = styled(IonItem).attrs((props) => {
  // Build Ionic classes to match styles of IonItem containing native input fields
  let classes = ["item-select", "item-interactive"];
  if (props.active) {
    classes.push("item-has-focus");
  }
  if (props.hasValue) {
    classes.push("item-has-value");
  }
  return {
    detail: false,
    lines: "inset",
    className: classes.join(" ")
  };
})`
  &.md {
    --min-height: 55px;
    align-items: center;
  }
  &.ios {
    --min-height: 67px;
    align-items: flex-end;
  }
  & ion-icon {
    transform: translate3d(0px, 0px, 0px)
      ${(props) => (props.active ? " rotate(180deg)" : "")};
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s,
      -webkit-transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  }
  /* &.item-has-value {
    --border-color: var(--ion-color-success-tint);
  } */

  & > [slot="error"] {
    --ion-color: var(--ion-color-danger);
    color: var(--ion-color-danger);
  }

  ${(props) =>
    !props.error
      ? null
      : `
    --border-color: var(--ion-color-danger) !important;
    & > ion-label.label {
      --ion-color: var(--ion-color-danger);
      color: var(--ion-color-danger);
    }
  `}
`;

const SelectLabel = styled(IonLabel).attrs({
  position: "floating",
  className: "label"
})`
  position: absolute;
  flex: 0 0 auto;
`;

const SelectValue = styled.div`
  position: absolute;
  align-items: flex-end;
  display: flex;
  flex: 1;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 8px;
`;

const SelectIcon = styled(IonIcon).attrs({
  color: "medium",
  icon: chevronDown,
  slot: "end"
})`
  &.ios {
    margin: 4px;
  }
`;

export function Select({
  label,
  options = [],
  value,
  onSelect,
  multiple = false,
  error = ""
}) {
  const [isActive, setActive] = useState(false);
  const handleDismiss = () => {
    setActive(false);
    dismiss();
  };

  const handleSelect = (selected) => {
    onSelect(selected);
    handleDismiss();
  };

  const [present, dismiss] = useIonModal(SelectOptionList, {
    handleDismiss,
    handleSelect,
    options,
    value,
    multiple
  });
  const showOptions = () => {
    setActive(true);
    present({
      showBackdrop: true,
      handle: false,
      backdropDismiss: true,
      breakpoints: [0.5, 1],
      initialBreakpoint: 0.5,
      onWillDismiss: () => setActive(false)
    });
  };

  const getLabel = () => {
    let labelText = label;
    if (!multiple) {
      const selectedOpt = options.find((opt) => opt.value === value);
      if (selectedOpt?.value === undefined) return null;
      labelText = selectedOpt.label || selectedOpt.value;
    } else {
      const valueArr = Array.isArray(value) ? value : [];
      if (valueArr.length === 0) return null;
      labelText = options
        .filter((opt) => valueArr.indexOf(opt.value) > -1)
        .map((opt) => opt.label || opt.value)
        .join(", ");
    }

    return <IonLabel>{labelText}</IonLabel>;
    // return <IonInput value={labelText} />
  };

  const valueLabel = getLabel();
  return (
    <SelectItem
      error={error}
      hasValue={valueLabel ? true : false}
      active={isActive}
      button
      onClick={showOptions}
    >
      <SelectLabel color="medium">{label}</SelectLabel>
      <SelectValue>{valueLabel}</SelectValue>
      <SelectIcon />
    </SelectItem>
  );
}
