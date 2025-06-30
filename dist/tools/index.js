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
    { schema: dockerRunSchema, handler: dockerRun },
    { schema: dockerPsSchema, handler: dockerPs },
    { schema: dockerImagesSchema, handler: dockerImages },
    { schema: dockerBuildSchema, handler: dockerBuild },
    { schema: dockerRmSchema, handler: dockerRm },
    { schema: dockerRmMultiSchema, handler: dockerRmMulti },
    { schema: dockerRmiSchema, handler: dockerRmi },
    { schema: dockerPushSchema, handler: dockerPush },
    { schema: dockerStopSchema, handler: dockerStop },
    { schema: dockerContainerPruneSchema, handler: dockerContainerPrune },
    { schema: dockerImagePruneSchema, handler: dockerImagePrune },
    { schema: dockerNetworkPruneSchema, handler: dockerNetworkPrune },
    { schema: dockerVolumePruneSchema, handler: dockerVolumePrune },
    { schema: dockerLoginSchema, handler: dockerLogin },
    { schema: dockerInspectSchema, handler: dockerInspect },
    { schema: dockerStopMultiSchema, handler: dockerStopMulti },
    { schema: dockerRmiMultiSchema, handler: dockerRmiMulti },
];
