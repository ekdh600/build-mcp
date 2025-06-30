export interface DockerToolSchema {
  name: string;
  description: string;
  parameters?: object;
  inputSchema?: object;
  returns: object;
}

export interface DockerPruneInput {
  // 옵션이 필요하면 여기에 추가
}

export interface DockerPruneOutput {
  ContainersDeleted?: string[];
  SpaceReclaimed?: number;
  // 필요시 확장
}
