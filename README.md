# react-native-DatePicker
类似 iOS 上的时间选择控件
用法如下:
 <DatePicker ref={ref => this.datePicker = ref}
                    unit={['年', '月', '日']}
                    startYear={1980}
                    HH={false}
                    mm={false}
                    ss={false}
                    onPickerConfirm={(value) => {
                        let arr = value
                        let str = ''
                        arr.map((item) => {
                            str = str + item
                        })
                        this.setState({ birthday: str })
                    }}
                    onPickerCancel={() => {

                    }}
                />
                
                
       
