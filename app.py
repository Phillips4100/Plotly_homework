from flask import Flask, jsonify, render_template, request, redirect

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc,select

import pandas as pd
import numpy as np