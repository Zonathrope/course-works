import { Injectable } from '@nestjs/common'

@Injectable()
class Converter {
  distinctZoos(array) {
    const result = []
    const map = new Map()
    for (const item of array) {
      if (!map.has(item.zoo_id._id.toString())) {
        map.set(item.zoo_id._id.toString(), true)
        result.push(item.zoo_id)
      }
    }
    return result
  }

  attachAnimalsToZones(array) {
    return array?.reduce((acc, obj) => {
      const key = `${obj?.zoo_id?._id.toString()}-${obj?.zone_id?._id.toString()}`
      if (acc[key] !== undefined) {
        acc[key] = {
          ...acc[key],
          animals: [...acc[key].animals, obj.animal_id]
        }
      } else {
        acc[key] = { zone: obj?.zone_id, animals: [obj.animal_id] }
      }
      return acc
    }, {})
  }

  attachZonesToZoos(zoos, zones) {
    let result = zoos
    for (const id in zones) {
      if (!id) {
        return
      }
      const zoo_id = id.toString().split('-')[0]
      result = result.map((zoo) => {
        if (zoo._id.toString() === zoo_id) {
          if (zoo._doc) {
            return {
              ...zoo._doc,
              zones: zoo.zones ? [...zoo.zones, zones[id]] : [zones[id]]
            }
          }
          return {
            ...zoo,
            zones: zoo.zones ? [...zoo.zones, zones[id]] : [zones[id]]
          }
        }
        if (zoo._doc) {
          return { ...zoo._doc }
        } else {
          return { ...zoo }
        }
      })
    }
    return result
  }

  combiner(array) {
    const animalsToZones = this.attachAnimalsToZones(array)
    const distinkedZoos = this.distinctZoos(array)

    const ready = this.attachZonesToZoos(distinkedZoos, animalsToZones)

    return ready
  }
}
const converter = new Converter()

export { converter, Converter }
