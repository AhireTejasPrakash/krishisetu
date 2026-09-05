
import json
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

DATA = "data/crop_data_synthetic.csv"
MODEL_PATH = "model/model.joblib"
LE_PATH = "model/label_encoder.joblib"
FEAT_PATH = "model/feature_order.json"

def main():
    df = pd.read_csv(DATA)
    X = df.drop(columns=["label"])
    y = df["label"]

    le = LabelEncoder()
    y_enc = le.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y_enc, test_size=0.2, random_state=42, stratify=y_enc)
    clf = RandomForestClassifier(n_estimators=300, random_state=42, n_jobs=-1)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, target_names=le.classes_, zero_division=0)

    joblib.dump(clf, MODEL_PATH)
    joblib.dump(le, LE_PATH)
    with open(FEAT_PATH, "w") as f:
        json.dump(list(X.columns), f, indent=2)

    print("Accuracy:", acc)
    print(report)

if __name__ == "__main__":
    main()
