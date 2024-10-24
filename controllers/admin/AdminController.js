const UserModel = require('../../models/user');
class AdminController{
    static dashboard = async(req,res)=>{
        try{
            res.render('admin/dashboard');
        }catch (error){
            console.log(error);
        }
    };
    static displayStudent = async(req,res)=>{
        try{
            const data = await UserModel.find();
            // console.log(data)
            res.render('admin/displaystudent',{d:data});
        }catch (error){
            console.log(error);
        }
    };
    static deleteStudent = async(req,res)=>{
        try{
            // const data = await UserModel.find();
            // console.log(data)
            // res.render('',{d:data});
            console.log(req.params.id)
        }catch (error){
            console.log(error);
        }
    };
    static viewStudent = async(req,res)=>{
        try{
            const data = await UserModel.findById(req.params.id)
            res.render('admin/view', {view:data})
        }catch (error){
            console.log(error);
        }
    };
    static editStudent = async(req,res)=>{
        try{
            const result = await UserModel.findById(req.params.id)
            res.render('admin/StudentEdit', {d:result})
        }catch (error){
            console.log(error);
        }
    };
    static updateStudent = async(req,res)=>{
        try{
            const id = req.params.id;
            const{name,email,password}= req.body
            await UserModel.findByIdAndUpdate(id,{
                name,
                email,
                password
            })
            res.render('admin/displaystudent',)
        }catch (error){
            console.log(error);
        }
    };
    static StudentInsert = async(req,res)=>{
        try{
            const{name,email,password}= req.body
            await UserModel.create({
                name,
                email,
                password
            })
            res.redirect('/admin/studentDisplay')
        } catch(error){
            console.log(error)
        }
    }
}
module.exports = AdminController