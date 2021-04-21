import React from "react";
import { SearchEmbed, init, EmbedEvent } from "@thoughtspot/visual-embed-sdk";
import { Spin } from "antd";
import { useEmailSender } from "./send-email";

export const Search = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { sendEmail, modalJSX } = useEmailSender();

  React.useEffect(() => {
    const tsSearch = new SearchEmbed("#tse", {
      frameParams: {},
      hideDataSources: true,
      dataSources: []
    });
    tsSearch
      .on(EmbedEvent.Init, () => setIsLoading(true))
      .on(EmbedEvent.Load, () => setIsLoading(false))
      .on(EmbedEvent.CustomAction, (payload: any) => {
        const data = payload.data;
        sendEmail(data);
      })
      .render();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="embedSpinner">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="TSEmbed" id="tse"></div>
      {modalJSX}
    </>
  );
};
