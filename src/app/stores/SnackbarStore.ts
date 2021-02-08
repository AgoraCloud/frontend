import { observable } from "mobx"
import { OptionsObject } from 'notistack'

export interface alert_i extends OptionsObject{
    message: string
}

interface storeAlert_i extends alert_i{
    key: number
}

export class SnackbarStore{

    @observable
    alerts: storeAlert_i[] = []
    constructor(){}


    push(alert: alert_i){
        this.alerts.push({
            key: new Date().getTime() + Math.random() as any, // had to do this to get rid of annoying lint
            autoHideDuration: 6000,
            ...alert
        })
    }


    get(): storeAlert_i[]{
        return this.alerts
    }


    remove(alert){
        return () => {
            this.alerts = this.alerts.filter((a)=>{a.key != alert.key})
        }
    }
}