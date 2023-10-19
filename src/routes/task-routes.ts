import {Router} from 'express';
import * as taskManagerHandler from '../handler/task-handler';


const router = Router();
router.route("/").get(taskManagerHandler.getAllTask);

router.route("/").post(taskManagerHandler.createTask);

router.route("/:id").get(taskManagerHandler.getTask);

router.route("/:id").patch(taskManagerHandler.editTask);

router.route("/:id/assign").patch(taskManagerHandler.assigneeTask);

router.route("/:id/status").patch(taskManagerHandler.changeStatus)

export default router;