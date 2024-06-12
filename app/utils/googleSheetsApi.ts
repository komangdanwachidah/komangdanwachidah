import { google } from "googleapis";
import type { sheets_v4 } from "googleapis";

export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const getAuthToken = async () => {
  const privateKeyString = (
    //process.env.GOOGLE_PRIVATE_KEY2 || '{ "privateKey": null }'
    //'{ "privateKey": "'+process.env.GOOGLE_PRIVATE_KEY+'" }' || '{ "privateKey": null }'
    //'{ "privateKey": '+process.env.GOOGLE_PRIVATE_KEY+' }' || '{ "privateKey": null }'
    '{ "privateKey": "'+"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCf1AaXq7Q/ukxp\nxlNDe7H4/ZoOpKkQ8fO585DwEHFoM6210slNRlArZ0sKxu+Wplvu31E2NlZNRVt6\ndknYH+QSLYLr/BMLfmHId3K7Oytiiw51PIngvYNbGmCkpjjZS+UeVpTKR4D7iB2P\nGeEUgHjBTDYaRmTL8DZm1MyafRCIcxtnJDQklPzmZenRAfEsa6F5MxX7CVUF9dDR\nL12fc6ASN59Pzig3nq509eCnJebMHukVBy3Wx6QYkF0F54HOb3WAU8ncfyctwFRT\na9JXCE2yqZOuYK3LOkCBkXAgbFun8RvLHtHsgBppvLBNOsLxN0dQqfAMm4hAK4vU\nNjnN9kAfAgMBAAECggEACqAo9AppSFdVXy7dOD5P/bK2fES8LLE5N+KWfy9IqtnM\nsara0TVcfRY36faB1S0oLYBRQN5p7GcxBro4fJLaMc8uxguTJI95Zr9yNDphzwJZ\nqreknvlac0MUq72VR/UAvXyaFbydOZu6A1qAGUHVRVyQuDx31QsaQsng9GBeKgQK\nCjr5xbum+/RInesTNgYZ7TrhL7OHscCr6cszdv74shAeE+nV4JVQfSp8jhdm7/tH\nC6xMJ1fDN+K3vE4HLw2MdQ4Qik2svY8bg676aolFw3voO8RP6r1sC1HDFHZOQvsi\nPCmY9jdL3DjB+DaW+IQzPlCHiPd98zWuedzgxgH8YQKBgQDd/VeSwqpDU8bduOkd\nLmkAO4zLD5h9o7WrNGUcqMh8rg1KJn/O1RjreO4mk+CLVWmWLZT+bWevNw80GmIf\nu8Nogyknx5M4ycYkmeUkPV02GKh+yvo82/lWUH2RuN9sOhaGHSi53EPkJf0EL0qb\nEb45aVBz5VFovB9BAKByIl6aLwKBgQC4UKaddoPrII9idCCEfVD0XHL5ZBVkyv22\np1wDJACleZ9OwVAfx4NKJ2TBCIVmT593Crz95sPeGq2K+4Q87zL7vOpguTDZdav6\nU+hxukRPbyG1MaGRe3v6MEQzlmpJEu9fIvRS8qpvDSDI6Lslokw80cyn1rvDHDBj\nD43eiHhtEQKBgQCQ14ExT/SZ82q5NrJbiPGX5kMKJ0XfDFc3uvsSRQpzV3lyXUZd\nJOuakJAK+ce0AenfxCQIEkhpqaow29oUTIXGhnXu76gekIDJVuSMzcEoz9P4zuWR\nmhHJAMG9t/uHeStDHHl7M73UefjppxWtslkEyrNku0Zv6PcXiZomfkhtnwKBgBRa\na5u1y6l6RfskQbb/s6HYV6XshGRF+jBiWMnL/vpG7O2gcT2hJYFZykl6rGh44G4f\n1HDhO73aClHvplGoRGQCH4ugx6Er2lrhSyjL3eE7r2g329SZ4z3keJONx5zcJ2zF\nCl/ihimPNJCbCpeETZDlxgi+sKtCAKHfxNXPEiVRAoGBALAVwAaCg8KsfTTE6K9z\n4wNa0zcS0wTRl+kDKQjbbtxREdyPm2Vv+7nLCtcZriHoxsN9fWc0j9elGQyZKmKu\n8WfsRzggsw6toJSIk8pvQYD4TGkdLYnYnUxrC4WqcKDL6UuIGPaOBmUMYSClnc91\ng8/yz9rW912aMh7VowbHOwjr\n-----END PRIVATE KEY-----\n"+'" }' || '{ "privateKey": null }'
  ).replace(/\n/g, "\\n");
  //console.log('process.env.GOOGLE_PRIVATE_KEY '+process.env.GOOGLE_PRIVATE_KEY)
  //console.log('privateKeyString '+privateKeyString)
  const { privateKey } = JSON.parse(privateKeyString);
  //const privateKey = privateKeyString

  //console.log('privateKey '+privateKey)

  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  return auth;
};

let sheets: sheets_v4.Sheets | undefined = undefined;

const getSheets = async () => {
  if (sheets) return sheets;

  const auth = await getAuthToken();
  sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

export const getPersonRemarks = async (name?: string) => {
  if (!name) return undefined;

  try {
    const sheets = await getSheets();
    const range = `Sheet1!A:B`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const dataRaw = response.data.values;
    const data =
      dataRaw?.map((data: string[]) => ({ name: data[0], remarks: data[1] })) ??
      [];
    const regex = new RegExp(`${name}$`, "i");
    const result = data.find((person) => regex.test(person.name));

    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const appendMessage = async (
  name: string,
  message: string,
  googleName: string
) => {
  try {
    const sheets = await getSheets();
    const range = `Sheet2!A:B`;
    const serverTime = new Date();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, message, serverTime, 0, googleName]],
      },
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export interface MessageItemType {
  name: string;
  message: string;
  date: string;
  hide: boolean;
}

export const getMessage = async () => {
  try {
    const sheets = await getSheets();
    const range = `Sheet2!A:D`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const dataRaw = response.data.values;
    const data: MessageItemType[] =
      dataRaw?.map((data: string[]) => ({
        name: data[0],
        message: data[1],
        date: data[2],
        hide: Boolean(Number(data[3])),
      })) ?? [];

    if (data.length > 1) data.shift();

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (err) {
    console.error(err);
    return [];
  }
};
