const express = require('express');
// const { getAllTools, saveAllTools } = require('../../controllers/tools.controller');
const toolController = require('../../controllers/tools.controller');
const viewCount = require('../../middleware/viewCount');
const limiter = require('../../middleware/limiter');
// console.log(express);

const router = express.Router()

/** Normally in a project only one developer don't work have to work large amount of programmer then we follow some steps to make easy the code to work with it 
 * 1 we folderize the route so that we can handle the large amount of route in the project 
 * 2 we also folerize the code into several file so that we can mantain that in large application 
 * 3  we give description in the code usin @api key so that other developer can understand the code and can work with it. 
 * 4. we use v so that we can record the relase version and we if we face erron in new version then so that we can back to last version to run the project
 * 
 */
// router.get('/', (req, res) => {
//     res.send("tools found")

// })
// router.post('/tools', (req, res) => {
//     res.send("tools posted")
// })




// router.route('/api/v1')
router.route('/file')
.get(toolController.getingFile)
router.route('')
  /**
    * @api {get} /tools All tools
    * @apiDescription Get all the tools
    * @apiPermission admin // only admin have access to this data
    *
    * @apiHeader {String} Authorization   User's access token // a token will be gotten 
    *
    * 
    * //
    * @apiParam  {Number{1-}}         [page=1]     List page
    * @apiParam  {Number{1-100}}      [limit=10]  Users per page
    *
    * @apiSuccess {Object[]} all the tools. // if api call seccess then it will return object type data
    *
    * 
    * // if api call error then it can be send these types of error 401,403
    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
    * @apiError (Forbidden 403)     Forbidden     Only admins can access the data // token exist but not a admin 
    */
  .get(toolController.getAllTools)


  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin // only admin have access to this data
   *
   * @apiHeader {String} Authorization   User's access token // a token will be gotten 
   *
   * 
   * //
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools. // if api call seccess then it will return object type data
   *
   * 
   * // if api call error then it can be send these types of error 401,403
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data // token exist but not a admin 
   */
  .post(toolController.saveAllTools, viewCount)


router.route('/:id/:test')
  .get(limiter, toolController.getToolsDetails)

router.route('/:id')
  .delete(toolController.deleteTool)
  .put(toolController.putTool)
  .patch(toolController.patchTool)

module.exports = router; 