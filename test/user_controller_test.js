import 'babel-polyfill'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import * as Common from '../src/NodeJsServer/config/common'
const should = chai.should()
chai.use(chaiHttp)

//Todo test user controller
describe('User controller', () => {
    beforeEach(done => {
        done()
    })
    //Todo: Test upload avatar
    describe(' Upload avatar', () => {
        it('it should res = 200',async () => {
            let imageBase64 = Common.convertToBase64('a.jpg')
            let res = await chai.request(app).post('/user/upload_avatar').send({
                url: imageBase64
            })
            res.should.have.status(200);
        })
    })
})