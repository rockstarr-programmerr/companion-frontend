import { Route, RoutePropsFunction, RouteConfig } from 'vue-router/types/router'

export function prefixWith (prefix: string, routeConfigs: Array<RouteConfig>): Array<RouteConfig> {
  return routeConfigs.map(routeConfig => {
    routeConfig.path = prefix + routeConfig.path
    return routeConfig
  })
}

export function castToNumber (prop: string): RoutePropsFunction {
  function _castToNumber (route: Route) {
    const propVal = route.params[prop]
    const propValCasted = parseInt(propVal)
    const props = { [prop]: propValCasted }
    return props
  }
  return _castToNumber
}
