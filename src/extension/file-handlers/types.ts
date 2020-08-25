export type SupportedFiletypes = 'json' | 'yaml' | '';

export type SupportedMethods =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'copy'
  | 'head'
  | 'options'
  | 'link'
  | 'unlink'
  | 'purge'
  | 'lock'
  | 'unlock'
  | 'propfind'
  | 'view';

export type SupportedResponseCode =
  | '100'
  | '101'
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205'
  | '206'
  | '300'
  | '301'
  | '302'
  | '303'
  | '304'
  | '305'
  | '307'
  | '308'
  | '400'
  | '401'
  | '402'
  | '403'
  | '404'
  | '405'
  | '406'
  | '407'
  | '408'
  | '409'
  | '410'
  | '411'
  | '412'
  | '413'
  | '414'
  | '415'
  | '416'
  | '417'
  | '418'
  | '421'
  | '426'
  | '428'
  | '429'
  | '431'
  | '500'
  | '501'
  | '502'
  | '504'
  | '505'
  | '506'
  | '507'
  | '511';

// [
//   {
//     text: "Continue",
//     value: "100"
//   },
//   {
//     text: "Switching Protocol",
//     value: "101"
//   },
//   {
//     text: "OK",
//     value: "200"
//   },
//   {
//     text: "Created",
//     value: "201"
//   },
//   {
//     text: "Accepted",
//     value: "202"
//   },
//   {
//     text: "Non-Authoritative Information",
//     value: "203"
//   },
//   {
//     text: "No Content",
//     value: "204"
//   },
//   {
//     text: "Reset Content",
//     value: "205"
//   },
//   {
//     text: "Partial Content",
//     value: "206"
//   },
//   {
//     text: "Multiple Choice",
//     value: "300"
//   },
//   {
//     text: "Moved Permanently",
//     value: "301"
//   },
//   {
//     text: "Found",
//     value: "302"
//   },
//   {
//     text: "See Other",
//     value: "303"
//   },
//   {
//     text: "Not Modified",
//     value: "304"
//   },
//   {
//     text: "Use Proxy",
//     value: "305"
//   },
//   {
//     text: "Temporary Redirect",
//     value: "307"
//   },
//   {
//     text: "Permanent Redirect",
//     value: "308"
//   },
//   {
//     text: "Bad Request",
//     value: "400"
//   },
//   {
//     text: "Unauthorized",
//     value: "401"
//   },
//   {
//     text: "Payment Required",
//     value: "402"
//   },
//   {
//     text: "Forbidden",
//     value: "403"
//   },
//   {
//     text: "Not Found",
//     value: "404"
//   },
//   {
//     text: "Method Not Allowed",
//     value: "405"
//   },
//   {
//     text: "Not Acceptable",
//     value: "406"
//   },
//   {
//     text: "Proxy Authentication Required",
//     value: "407"
//   },
//   {
//     text: "Request Timeout",
//     value: "408"
//   },
//   {
//     text: "Conflict",
//     value: "409"
//   },
//   {
//     text: "Gone",
//     value: "410"
//   },
//   {
//     text: "Lenght Required",
//     value: "411"
//   },
//   {
//     text: "Precondition Failed",
//     value: "412"
//   },
//   {
//     text: "Payload Too Large",
//     value: "413"
//   },
//   {
//     text: "URI Too Long",
//     value: "414"
//   },
//   {
//     text: "Unsupported Media Type",
//     value: "415"
//   },
//   {
//     text: "Requested Range Not Satisfiable",
//     value: "416"
//   },
//   {
//     text: "Expectation Failed",
//     value: "417"
//   },
//   {
//     text: "I'm a teapot",
//     value: "418"
//   },
//   {
//     text: "Misdirected Request",
//     value: "421"
//   },
//   {
//     text: "Upgrade Required",
//     value: "426"
//   },
//   {
//     text: "Precondition Required",
//     value: "428"
//   },
//   {
//     text: "Too Many Requests",
//     value: "429"
//   },
//   {
//     text: "Request Header Fields Too Large",
//     value: "431"
//   },
//   {
//     text: "Internal Server Error",
//     value: "500"
//   },
//   {
//     text: "Not Implemented",
//     value: "501"
//   },
//   {
//     text: "Service Unavailable",
//     value: "502"
//   },
//   {
//     text: "Gateway Timeout",
//     value: "504"
//   },
//   {
//     text: "HTTP Version Not Supported",
//     value: "505"
//   },
//   {
//     text: "Variant Also Negotiates",
//     value: "506"
//   },
//   {
//     text: "Variant Also Negotiates",
//     value: "507"
//   },
//   {
//     text: "Network Authentication Required",
//     value: "511"
//   }
// ]

export type UpdateActiveBlockType = 'add' | 'remove';

/**
 * File handler is responsible for parsing and extracting EditableBlocks.
 * Also deals with updating open api properties.
 *
 * We currently have two handlers as below
 * - yaml File handler - Deals with .yaml files to support yaml editing
 * - json File handler - Deals with .json files to support json editing
 */
export interface FileHandler {
  getEditableBlocks(fileContent: string, languageId: SupportedFiletypes): EditableBlock[];
  updateProperty(activeBlock: EditableBlock, prop: string, value: string, languageId: string): string;
  removeProperty(activeBlock: EditableBlock, prop: string): string;
}

/**
 * An abstract representation of an editable block
 *
 * "get": {
        "operationId": "listVersionsv2",
        "summary": "List API versions",
        "responses": {
          "200": {
            "description": "200 response",
            "content": {
              "application/json": {
                "examples": {
                  "foo": {
                    "value": {
                      "versions": [
                        {
                          "status": "CURRENT",
                          "updated": "2011-01-21T11:33:21Z",
                          "id": "v2.0",
                          "links": [
                            {
                              "href": "http://127.0.0.1:8774/v2/",
                              "rel": "self"
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
 */
export interface EditableBlock {
  pathSelector: string;
  apiDeclarations: ApiDeclaration[];
}

export interface ApiDeclaration {
  type: SupportedMethods;
  operationId: string;
  summary: string;
  responses: ApiResponse;
}

export interface ApiResponse {
  code: SupportedResponseCode;
  description: string;
  content: any;
}

export interface LocationPosition {
  column: 0;
  line: 0;
}
