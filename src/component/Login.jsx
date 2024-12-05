import { Button, Checkbox, Form, Input, Card } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App = () => (
  <>
  <h1>Welcome to E-Commerce Website</h1>
  <Card
    title="Login Form"
    style={{
      maxWidth: 600,
      margin: '0 auto',
      marginTop: '50px',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
    }}
  >
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Enter Mobile Number"
        name="mobileNumber"
        rules={[
          {
            required: true,
            message: 'Please input your mobile number!',
          },
          {
            pattern: /^[0-9]{10}$/,
            message: 'Mobile number must be 10 digits!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          // offset: 8,
          // span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          // offset: 8,
          // span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Card>
  </>
);

export default App;
