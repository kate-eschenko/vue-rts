export interface Point {
  x: number
  y: number
}

export interface ObjectType {
  name: string
  width: number
  height: number
  color: string
}

export interface UnitType extends ObjectType {
  speedPxPerSecond: number
}

// статичный объект на карте
export interface StaticObject extends Point {
  id: number
  type: string // из OBJECT_TYPES
}

// движущийся объект (юнит)
export interface Unit extends Point {
  id: number
  type: string // из UNIT_TYPES
  target: Point | null // целевая точка при перемещении, null у стоящего объекта
}
