import { Router } from 'express'

import { } from '../controllers/UserController';
const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')


const router = Router();
// const userCreate = new UserController();
// const userCreate = new CreateUserController()

// router.post("/user", userCreate.handle)

router.post("/user", UserController.create);
router.get("/user", UserController.index);
router.get("/user/:id", UserController.show);
router.put("/user/:id", UserController.update)
router.delete("/user/:id", UserController.destroy);
router.get("/user/post/:id", UserController.showPostsUser)

router.post("/post/user/:id", PostController.createPost)
router.get("/posts", PostController.index)
router.put("/post/:id", PostController.updatePost)
router.get("/post/user/:id", PostController.show)
router.delete("/postdelete/:id", PostController.destroy)




// const userFind = new FindUserController()
// router.get("/user/:id", userFind.handle)
// router.post("/user", userCreate.create);
// router.get("/user", userCreate.index);
// router.get("/user/:id", userCreate.show);
// router.put("/userupdate/:id", userCreate.update);
// router.delete("/user/:id", userCreate.delete);

export { router};
