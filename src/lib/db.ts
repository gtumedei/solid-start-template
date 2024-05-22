import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"

export const db = createStorage({ driver: memoryDriver() })
