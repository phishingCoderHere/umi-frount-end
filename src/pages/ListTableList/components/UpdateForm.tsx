import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

import { getRoles } from '../service'

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

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
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate(formVals);
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="target" label="角色">
            <Select style={{ width: '100%' }}
              mode="multiple"
              placeholder="请选择角色"
              defaultValue={['admin']}>
              {roleData.map(role => (<Option key={role} value={role} >role</Option>))}
            </Select>
          </FormItem>
          <FormItem name="template" label="电子邮箱">
            <Input placeholder="请输入电子邮箱" />
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间！' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          </FormItem>
          <FormItem name="frequency" label="调度周期">
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="规则名称"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="desc"
          label="规则描述"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      {/* <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="配置规则属性" />
        <Step title="设定调度周期" />
      </Steps> */}
      <Form
        {...formLayout}
        form={form}
      // initialValues={{
      //   target: formVals.target,
      //   template: formVals.template,
      //   type: formVals.type,
      //   frequency: formVals.frequency,
      //   name: formVals.name,
      //   desc: formVals.desc,
      // }}
      >
        <FormItem name="target" label="角色">
          <Select style={{ width: '100%' }}
            mode="multiple"
            placeholder="请选择角色"
            defaultValue={['admin']}>
            {roleData.map(role => (<Option key={role} value={role} >{role}</Option>))}
          </Select>
        </FormItem>
        <FormItem name="template" label="电子邮箱">
          <Input placeholder="请输入电子邮箱" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
