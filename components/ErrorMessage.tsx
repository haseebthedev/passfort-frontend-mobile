import React from "react";
import { AppText } from "./AppText";

export interface ErrorMessageProps {
  error?: string;
  visible?: boolean;
}

export const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
  if (!visible || !error) return null;
  return <AppText text={error} type="errorText" />;
};
