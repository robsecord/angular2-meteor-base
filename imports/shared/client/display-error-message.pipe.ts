// Angular/Meteor Components
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

// Display Name Pipe
@Pipe({
    name: 'displayErrorMsg'
})
export class DisplayErrorMsgPipe implements PipeTransform {
    transform(err: any): string {
        if (_.has(err, 'reason')) {
            return err.reason;
        }

        if (_.has(err, 'message')) {
            return err.message;
        }

        return err;
    }
}
