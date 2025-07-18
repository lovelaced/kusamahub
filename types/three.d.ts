import { Object3DNode } from '@react-three/fiber'
import { Material } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterLayerMaterial: Object3DNode<Material, typeof Material>
    }
  }
}