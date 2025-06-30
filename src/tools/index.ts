import { dockerRunSchema, dockerRun } from "./docker-run.js";
import { dockerPsSchema, dockerPs } from "./docker-ps.js";
import { dockerImagesSchema, dockerImages } from "./docker-images.js";
import { dockerBuildSchema, dockerBuild } from "./docker-build.js";
import { dockerRmSchema, dockerRm, dockerRmMultiSchema, dockerRmMulti } from "./docker-rm.js";
import { dockerRmiSchema, dockerRmi } from "./docker-rmi.js";
import { dockerPushSchema, dockerPush } from "./docker-push.js";
import { dockerStopSchema, dockerStop } from "./docker-stop.js";
import { dockerContainerPruneSchema, dockerContainerPrune } from "./docker-container-prune.js";
import { dockerImagePruneSchema, dockerImagePrune } from "./docker-image-prune.js";
import { dockerNetworkPruneSchema, dockerNetworkPrune } from "./docker-network-prune.js";
import { dockerVolumePruneSchema, dockerVolumePrune } from "./docker-volume-prune.js";
import { dockerLoginSchema, dockerLogin } from "./docker-login.js";
import { dockerInspectSchema, dockerInspect } from "./docker-inspect.js";
import { dockerStopMultiSchema, dockerStopMulti } from "./docker-stop-multi.js";
import { dockerRmiMultiSchema, dockerRmiMulti } from "./docker-rmi-multi.js";

export const dockerTools = [
  { schema: dockerRunSchema, handler: dockerRun as (args: any) => Promise<any> },
  { schema: dockerPsSchema, handler: dockerPs as (args?: any) => Promise<any> },
  { schema: dockerImagesSchema, handler: dockerImages as (args?: any) => Promise<any> },
  { schema: dockerBuildSchema, handler: dockerBuild as (args: any) => Promise<any> },
  { schema: dockerRmSchema, handler: dockerRm },
  { schema: dockerRmMultiSchema, handler: dockerRmMulti },
  { schema: dockerRmiSchema, handler: dockerRmi as (args: any) => Promise<any> },
  { schema: dockerPushSchema, handler: dockerPush as (args: any) => Promise<any> },
  { schema: dockerStopSchema, handler: dockerStop as (args: any) => Promise<any> },
  { schema: dockerContainerPruneSchema, handler: dockerContainerPrune as (args?: any) => Promise<any> },
  { schema: dockerImagePruneSchema, handler: dockerImagePrune as (args?: any) => Promise<any> },
  { schema: dockerNetworkPruneSchema, handler: dockerNetworkPrune as (args?: any) => Promise<any> },
  { schema: dockerVolumePruneSchema, handler: dockerVolumePrune as (args?: any) => Promise<any> },
  { schema: dockerLoginSchema, handler: dockerLogin as (args: any) => Promise<any> },
  { schema: dockerInspectSchema, handler: dockerInspect as (args: any) => Promise<any> },
  { schema: dockerStopMultiSchema, handler: dockerStopMulti },
  { schema: dockerRmiMultiSchema, handler: dockerRmiMulti },
];
