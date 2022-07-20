// Utils
import { isObjKey } from "../utils";
// Types
import { errorSentances, successSentances, langTerms } from "../types";

const arTerms: langTerms = {
  name: "الاسم",
  username: "اسم المستخدم",
  description: "وصف",
  id: "المعرف",
  slug: "الاسم",
  project: "المشروع",
  task: "المهمة",
  user: "المستخدم",
};

const arSuccessData = (path: string): successSentances => {
  const sentances: successSentances = {
    create: `تم إنشاء ${translate(path)} بنجاح`,
    edit: `تم تحديث ${translate(path)} بنجاح`,
    delete: `تم حذف ${translate(path)} بنجاح`,
  };

  return sentances;
};

const arErrorData = (path: string, value?: string) => {
  const sentances: errorSentances = {
    required: `.!مطلوب ${translate(path)}`,
    special:
      ".على أحرف وأرقام فقط " +
      translate(path) +
      " تنسيق غير صحيح: يجب أن يحتوي",
    email: ".example@example.com :الرجاء إدخال بريد إلكتروني بالتنسيق",
    number: `.على أرقام فقط ${translate(
      path
    )} تم إدخال قيمة غير صحيحة: يجب أن يحتوي`,
    zip: `.الرجاء إدخال رمز بريدي صالح لمنطقتك`,
    unique: `يوجد ${translate(path)} بنفس القيمة بالفعل`,
    minLength: `.أحرف على الأقل ${value ?? "2"} من ${translate(
      path
    )} يجب أن يتكون`,
    maxLength: `.أحرف على الأكثر ${value ?? "12"} من ${translate(
      path
    )} يجب أن يتكون`,
    boolean: `.منطقيا ${translate(path)} تم إدخال قيمة غير صحيحة: يجب أن يكون`,
    date: `.تنسيق التاريخ غير صحيح`,
    string: `.!عبارة عن سلسلة من الأحرف ${translate(path)} يجب أن يكون`,
    betweenLength: `حرف ${value ?? "200, 20"} على ما بين ${translate(
      path
    )} يجب أن يحتوي`,
    credentials: `.!خطأ في اسم المستخدم أو كلمة مرور`,
    exist: `!.${path} غير موجود`,
  };

  return sentances;
};

const translate = (word: string): string => {
  let translateResult = word;

  if (isObjKey(word, arTerms)) translateResult = arTerms[word];

  return translateResult;
};

export { arTerms, arErrorData, arSuccessData };
