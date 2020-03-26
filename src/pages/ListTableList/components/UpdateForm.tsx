import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, } from 'antd';

import { read } from '@/utils/cookie-utils';
import { TableListItem } from '../data.d';

import { getRoles } from '../service'

export interface FormValueType extends Partial<TableListItem> {
  id?: string;
  login?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  activated?: boolean;
  authorities?: string[];
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

let roleData: any[] = [];
getRoles().then(resp => {
  roleData = resp;
})

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals] = useState<FormValueType>({

    id: props.values.id,
    login: props.values.login,
    email: props.values.email,
    firstName: props.values.firstName,
    lastName: props.values.lastName,
    imageUrl: props.values.imageUrl,
    activated: props.values.activated,
    authorities: props.values.authorities,

  });

  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;

  const handleUpdate = async () => {
    const fieldsValue = await form.validateFields();
    console.log('XSRF-TOKEN', read('XSRF-TOKEN'));

    onSubmit({ ...formVals, ...fieldsValue })
  }

  const renderFooter = () => (<>
    <Button onClick={() => handleUpdateModalVisible(false)}>取消</Button>
    <Button type="primary" onClick={() => handleUpdate()}>
      确定
  </Button>
  </>)

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={formVals}
      >
        <FormItem name="login" label="用户">
          <Input disabled />
        </FormItem>
        <FormItem name="authorities" label="角色">
          <Select style={{ width: '100%' }}
            mode="multiple"
            placeholder="请选择角色">
            {roleData.map(role => (<Option key={role} value={role} >{role}</Option>))}
          </Select>
        </FormItem>
        <FormItem name="email" label="电子邮箱">
          <Input placeholder="请输入电子邮箱" />
        </FormItem>
      </Form>
    </Modal>
  );
};
export default UpdateForm;
