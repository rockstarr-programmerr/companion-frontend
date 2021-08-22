import { RouteConfig } from 'vue-router'

export function prefixWith (prefix: string, routeConfigs: Array<RouteConfig>): Array<RouteConfig> {
  return routeConfigs.map(routeConfig => {
    routeConfig.path = prefix + routeConfig.path
    return routeConfig
  })
}
