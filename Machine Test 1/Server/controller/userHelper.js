var db = require('../config/connection')
var collection = require('../config/collection')
module.exports = {
    addTimeSlot: (start, end, day) => {
        return new Promise(async (resolve, reject) => {
            let slotDay = await db.get().collection(collection.TIME_SLOT).findOne({ Day: day })
            let duration = (start + "-" + end)
            if (!slotDay) {
                
                let data={
                    Day:day,
                    Appointments:[duration]
                }
                db.get().collection(collection.TIME_SLOT).insertOne(data).then((response)=>
                {
                    resolve()
                })
            } else {
                
                if (slotDay.Appointments.length > 0) {
                    let appo = slotDay.Appointments
                    for (let i = 0; i < appo.length; i++) {
                        let appoStart = appo[i].slice(0, 5)
                        let appoEnd = appo[i].slice(6, 11)
                        if (start >= appoStart && start <= appoEnd) {
                            reject()
                            break;
                        } else {
                            if (end >= appoStart && end <= appoEnd) {
                                reject()
                                break;
                            } else {
                                if(appoStart>=start && appoEnd<=end)
                                {
                                    reject()
                                    break;
                                }else{
                                    db.get().collection(collection.TIME_SLOT).findOne({Day:day,Appointments:duration}).then((check)=>
                                    {
                                        console.log(check);
                                        if(check==null)
                                        {
                                            db.get().collection(collection.TIME_SLOT).updateOne({Day:day},{
                                                $push:{
                                                    Appointments:duration
                                                }
                                            }).then(()=>
                                            {
                                                resolve()
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}