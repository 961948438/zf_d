import React,{useRef,useState,useEffect} from 'react'
import {ImagePicker, List, Switch,
  InputItem,Button,Flex, WhiteSpace, Toast} from 'antd-mobile'
import {API} from '../../comfuc/comfuc'
import {BASE_URL} from '../../comfuc/comenv'
import { createForm } from 'rc-form';
import NavHeader from '../../components/NavHeader';

function EditMy(props) {
  const fileref = useRef("1")
  const [tempSlides, settempSlides] = useState([])
  const [checked1, setchecked1] = useState(false)
  const [userinfo, setuserinfo] = useState({})

  useEffect(() => {
    API.get('/user').then(result => {
      console.log(result)
      if (result.data.status === 400) {
        props.history.push('/login')
        return
      }
      setuserinfo(result.data.body)
      settempSlides([{url:BASE_URL+result.data.body.avatar,type:'init'}])
    })
    return () => {}
  }, [])

  useEffect(async() => {
    try {
      if (tempSlides[0].type) {
        return 
      }
    }
    catch(r) {
      return
    }
    if (tempSlides.length > 0) {
      const form = new FormData()
      tempSlides.forEach(item => form.append('file', item.file))
      const res = await API.post('/user/awat', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res.data.body[0])
      setuserinfo({
        ...userinfo,
        avatar:res.data.body[0]
      })
    }
    return () => {

    }
  }, [tempSlides])

  const { getFieldProps } = props.form;
  
  const handleSubmit = async (e) =>{
    console.log('zzzzzzzzz')
    API.patch('/user',userinfo).then(result => {
      console.log(result)
      Toast.success('修改成功',2,()=>{props.history.go(-1)},false)

    }).catch(err => console.log(err))

  }
  const handleHouseImg = (files, type, index) => {
    console.log(files, type, index)
    let mapfile = files.slice(1)
    setTimeout(() => {
      settempSlides(mapfile)
    }, 10);
  }
  const handleName = (value) => {
    setuserinfo({
      ...userinfo,
      nickname:value
    })
    
  }
  const handlePhone = (value) => {
    setuserinfo({
      ...userinfo,
      phone:value
    })
  }
  return (
    <div>
      <NavHeader>编辑信息</NavHeader>
      <form action={`${BASE_URL}/user/awat`}
      encType='multipart/form-data' method='post' onSubmit={handleSubmit}>
        <List renderHeader={() => '头像'}>
        <ImagePicker
          selectable = {true}
            files={tempSlides}
            onChange={handleHouseImg}
        />
        </List>
        
        <List renderHeader={() => '昵称'}>
          <InputItem
            {...getFieldProps('inputclear')}
            clear
            placeholder="Please enter nickname"
            value = {userinfo.nickname}
            onChange={handleName}
          ></InputItem>
        </List>
        <List renderHeader={() => '手机'}>
          <InputItem style={{width:'50%',flex:1}}
            {...getFieldProps('inputclear')}
            clear
            placeholder="Please enter mobile "
            value={userinfo.phone}
            onChange={handlePhone}
            
          ></InputItem>
        </List>
        <List
          renderHeader={() => '性别'}
        >
          <List.Item
          extra={<Switch
            {...getFieldProps('Switch1', {
              initialValue: userinfo.gender == 0?false:true,
              valuePropName: 'checked',
              onChange: (value) => {
                console.log(value);
                
              },
            })}
            onClick={(checked) => {
              setuserinfo({
                ...userinfo,
                gender:checked == true ? '1':'0'
              })
            }}
          />}
          ><span style={{
            'fontFamily': 'Microsoft YaHei',
            'fontSize': '14px',
            'color': '#888',
          }}>
          default：female
            </span>
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Flex direction="row"
        alignContent='center'
        >
          <Button   onClick={handleSubmit}
          type="primary" inline style={{ marginRight: '4px',width:'50%',marginLeft:'4px' }}>
            确认</Button>
          <Button type="ghost" inline style={{ marginRight: '4px',width:'50%' }} 
          className="am-button-borderfix">放弃编辑</Button>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </form>
    </div>
  )
}

export default  createForm()(EditMy)