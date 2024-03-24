import { Router } from 'express';
import {
    dummyData
} from "../../controllers/dummy.controller.js"

const router = Router();

router.route("/").get(dummyData);

export default router