import React, { ComponentProps, KeyboardEvent, useEffect } from "react";
import ReactDom from "react-dom/client";
import { useState, ReactPropTypes } from "react";
import { getSearchSuggestions, getTopLists } from "../../axios/request";
import { useNavigate } from "react-router-dom";
import "./index.scss";
type StateType = { toplist: any[] };
export function Me(props: ComponentProps<any>) {
  return <div>me</div>;
}
