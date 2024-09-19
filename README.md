# sctp-ce6-mod3.12

[![CICD for Serverless Application](https://github.com/tsanghan/sctp-ce6-mod3.12/actions/workflows/ci.yaml/badge.svg)](https://github.com/tsanghan/sctp-ce6-mod3.12/actions/workflows/ci.yaml)

This repo container code and workflow pipeline for SCTP CE6 Mod3.12

Sailent points first, beautifying README.md later.

1) This is deployed with `Serverless Framwork v4`.
2) Workflow pipeline is adjusted to have login requirement satisfied for Serverless Framwork to function in pipeline.
3) It seems `Serverless Framwork v4` deploy API Gateway with `2.0 payload format`.
4) Thus, when performing test in Lambda, `API Gateway Http API` template must be selected.
5) With the corresponding code below,
```
JSON.parse(Buffer.from(event.body, 'base64').toString());
```
6) Not with the code below,
```
JSON.parse(event.body);
```