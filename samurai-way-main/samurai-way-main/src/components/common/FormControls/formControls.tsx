import React from "react";
import styles from './formControls.module.css'

export const Textarea = ({meta, input, ...props}: any) => {

    const hasError = meta.error && meta.touched
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <div>
            <textarea {...input} {...props}/>
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}

export const Input = ({meta, input, ...props}: any) => {

    const hasError = meta.error && meta.touched
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <div>
            <input {...input} {...props}/>
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}